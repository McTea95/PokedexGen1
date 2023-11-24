const { MongoClient } = require('mongodb');
const { connectToMongoDB } = require('../db');

jest.mock('mongodb');
const mockConnect = jest.fn();

describe('Database Connection', () => {
  beforeAll(() => {
    MongoClient.connect = mockConnect;
  });

  afterAll(() => {
    MongoClient.connect.mockRestore();
  });

  it('should connect to MongoDB successfully', async () => {
    const dummyClient = {};
    mockConnect.mockResolvedValue(dummyClient);

    const { client } = await connectToMongoDB();

    expect(mockConnect).toHaveBeenCalledWith('mongodb://mongodb:27017');
    expect(client).toBe(dummyClient);
  });
});
