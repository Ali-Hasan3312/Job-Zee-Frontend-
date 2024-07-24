export type User = {
    name: string;
    email: string;
    phone: number | null;
    password: string;
    role: string;
    _id: string;
  };

export type job =
  {
  _id: string;
  title: string;
  description: string;
  category: string;
  country: string;
  city: string;
  location: string;
  fixedSalary?: number;
  salaryFrom?: number;
  salaryTo?: number;
  expired: boolean;
  jobPostedOn: Date;
  postedBy: string;
}


  