export interface userregister{
    userName: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface confirmregistation{
    userid: number;
    username: string;
    otptext: string;
}


export interface usercred{
    username: string;
    password: string;
}

export interface loginresp{
    token:string;
    refreshToken: string;
    role: string;
}

export interface menue{
    code: string;
    name: string;
}

export interface resetpassword{
    username: string;
    oldpassword: string;
    newpassword: string;
}

export interface updatepassword{
    username:string;
    password: string;
    otptext: string;
}


export interface menupermission{
    userrole?: string;
    menucode?: string;
    code: string;
    name: string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
}

export interface users{
    username: string;
    name: string;
    email: string;
    phone: string;
    isactive: boolean;
    role: string;
    statusname: string;
}


export interface udpateuser{
    username: string;
    userrole: string;
    userstatus: boolean;
} 

export interface roles{
    code: string,
    name: string,
    status: string
}

export interface menues{
    code: string,
    name: string,
    status: string
}

