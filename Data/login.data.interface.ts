export interface UserEntry {
    email:string;
    password :string;
    role : string;
}

export interface Users {
    [username : string] : UserEntry;
}
  