export const DB_NAME = 'Projects'
const DB_VERSION = 1;
export const DEFAULT_STORE_NAME = 'projects';

const DBConfig = {
    name: DB_NAME,
    version: DB_VERSION,
    objectStoresMeta: [
      {
        store: DEFAULT_STORE_NAME,
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          { name: "content", keypath: "content", options: { unique: false } },
        ],
      },
    ],
  };

  export default DBConfig;