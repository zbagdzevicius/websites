export class Company {
  firstName: string;
  lastName: string;
  companyName: string;
  recruiterJobTitle: string;
  jobOpenings: number;

  constructor(json: any) {
    if (json != null) {
      this.firstName = json.firstName;
      this.lastName = json.lastName;
      this.companyName = json.companyName;
      this.recruiterJobTitle = json.recruiterJobTitle;
      this.jobOpenings = json.jobOpenings;
    }
  }
}
