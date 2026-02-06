process.env.GCLOUD_PROJECT = 'your-project-id'; // Set the GCLOUD_PROJECT environment variable
jest.mock('firebase-admin', () => {
    // your existing firebase-admin mock setup
});
