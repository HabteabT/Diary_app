const firebaseMock = require('firebase-mock');
const mockFirestore = new firebaseMock.MockFirestore();
mockFirestore.autoFlush();
global.admin = require('firebase-admin');
global.admin.initializeApp = jest.fn();
global.admin.firestore = () => mockFirestore;
// At the top of your test files (both summarizeWeeklyEntries.test.js and summarizeYearlyEntries.test.js)
jest.mock('firebase-admin', () => {
    const firestoreMock = {
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        get: jest.fn(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        onSnapshot: jest.fn(),
        set: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
        runTransaction: jest.fn().mockImplementation((transactionFunc) => {
            const transaction = {
                get: jest.fn().mockResolvedValue({ exists: false, data: () => ({}) }),
                set: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            };
            return transactionFunc(transaction);
        })
    };

    return {
        apps: [],
        initializeApp: jest.fn().mockReturnThis(),
        firestore: jest.fn(() => firestoreMock),
        auth: jest.fn(() => ({ currentUser: { uid: 'testUid' } })),
        credential: {
            cert: jest.fn()
        }
    };
});

const { summarizeYearlyEntries } = require('../index'); // Corrected path to your functions file

describe('summarizeYearlyEntries', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFirestore.reset();
    });

    it('should handle no summaries found', async () => {
        // Setup Firestore to return no documents
        mockFirestore.collection('summaries').where = jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ empty: true })
        }));

        await expect(summarizeYearlyEntries()).resolves.toBeNull();
        // Additional assertions can be made here
    });

    it('should summarize entries correctly when found', async () => {
        // Setup Firestore to return some documents
        mockFirestore.collection('summaries').where = jest.fn(() => ({
            get: jest.fn().mockResolvedValue({
                empty: false,
                docs: [
                    { data: () => ({ uid: 'user1', text: 'Weekly summary 1' }) },
                    { data: () => ({ uid: 'user2', text: 'Weekly summary 2' }) }
                ]
            })
        }));

        // Mock OpenAI API
        const mockOpenAI = {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ text: 'Yearly Summary text' }]
                })
            }
        };
        global.OpenAI = jest.fn(() => mockOpenAI);

        await summarizeYearlyEntries();
        // Check that yearly summary is stored in Firestore
    });

    it('should handle OpenAI API failure', async () => {
        // Assume entries are found
        mockFirestore.collection('summaries').where = jest.fn(() => ({
            get: jest.fn().mockResolvedValue({
                empty: false,
                docs: [{ data: () => ({ uid: 'user1', text: 'Weekly summary 1' }) }]
            })
        }));

        // Mock OpenAI API to throw an error
        const mockOpenAI = {
            completions: {
                create: jest.fn().mockRejectedValue(new Error('API failure'))
            }
        };
        global.OpenAI = jest.fn(() => mockOpenAI);

        await expect(summarizeYearlyEntries()).rejects.toThrow('API failure');
        // Ensure cleanup is still performed
    });

    afterEach(() => {
        // Clean up any mocks
        mockFirestore.reset();
    });
});
