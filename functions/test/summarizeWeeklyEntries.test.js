const firebaseMock = require('firebase-mock');
const mockFirestore = new firebaseMock.MockFirestore();
mockFirestore.autoFlush();
global.admin = require('firebase-admin');
global.admin.initializeApp = jest.fn();
global.admin.firestore = () => mockFirestore;

const { summarizeWeeklyEntries } = require('../index'); // Corrected path to your functions file


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

describe('summarizeWeeklyEntries', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle no entries found', async () => {
        // Setup Firestore to return no documents
        mockFirestore.collection('diary').where = jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ empty: true })
        }));

        await expect(summarizeWeeklyEntries()).resolves.toBeNull();
        // Additional assertions can be made here
    });

    it('should handle entries and summarize correctly', async () => {
        // Setup Firestore to return some documents
        mockFirestore.collection('diary').where = jest.fn(() => ({
            get: jest.fn().mockResolvedValue({
                empty: false,
                docs: [{ data: () => ({ uid: 'user1', text: 'Entry text' }) }]
            })
        }));

        // Mock OpenAI API
        const mockOpenAI = {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ text: 'Summary text' }]
                })
            }
        };
        global.OpenAI = jest.fn(() => mockOpenAI);

        await summarizeWeeklyEntries();
        // Check that summary is stored in Firestore
    });
});
