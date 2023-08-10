export interface Bio {
  type?: string;
  name?: string;
  title?: string;
  socialLinks?: string[];
  tldr?: string;
  aboutMe?: string;
  image?: string;
  hobbies?: string[];
  jobStatus?: string;
  docs?: Docs;
}

export interface Docs {
  resume?: string;
  transcript?: string;
}
