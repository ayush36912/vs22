const Validations = {
  checkNetConnection: async () => {
    let isConnected = window.navigator.onLine;
    if (isConnected) {
      return true;
    } else {
      return false;
    }
  },
  validateObject: async (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== false) {
          return false; // Found a key with a value other than false
        }
      }
    }
    return true; // All keys have a value of false
  },
};
export default Validations;
