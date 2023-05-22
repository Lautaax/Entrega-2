class Contact {
    constructor() {
      this.data = [
        {
          first_name: String,
          last_name: String,
          email: String,
          phone: String,
        },
      ];
    }
  
    get = () => {
      return this.data;
    };
  
    create = (contact) => {
      this.data.push(contact);
      return this.data;
    };
  }
  
  export const contactMemory = new Contact();