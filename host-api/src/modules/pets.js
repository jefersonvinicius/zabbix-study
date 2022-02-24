const { uuidV4 } = require('../common/uuid');

const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;

class PetName {
  constructor(_name) {
    if (!_name) throw new Error(`Pet name show be a string valid, a ${typeof _name} was provided`);
    this.value = _name;
  }
}

class PetBirthDate {
  constructor(_dateStr) {
    const date = new Date(_dateStr);
    if (isNaN(date.getTime())) throw Error(`birthDate show receive valid date string, but got ${_dateStr}`);
    this.value = date;
    this.valueStr = _dateStr;
  }
}

class Pet {
  constructor(data = {}) {
    this.id = data.id ?? uuidV4();
    this._name = new PetName(data.name);
    this._birthDate = new PetBirthDate(data.birthDate);
  }

  get name() {
    return this._name.value;
  }

  get age() {
    const diff = Date.now() - this.birthDate.getTime();
    return Math.round(diff / YEAR_IN_MS);
  }

  get birthDate() {
    return this._birthDate.value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      birthDate: this.birthDate,
    };
  }
}

exports.Pet = Pet;
