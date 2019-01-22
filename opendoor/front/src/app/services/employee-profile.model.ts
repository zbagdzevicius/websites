export class Employee {
  firstName: string;
  lastName: string;
  birth: string;
  city: string;
  telephone: string;
  description: string;
  keywords: Array<string>;
  work_experience: number;

  constructor(json: any) {
    if (json != null) {
      this.firstName = json.firstName;
      this.lastName = json.lastName;
      this.birth = json.birth;
      this.city = json.city;
      this.telephone = json.telephone;
      this.description = json.description;
      this.keywords = json.keywords;
      this.work_experience = json.work_experience;
    }
  }
}
