export type Agent = {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    credits: number;
    avatarUrl: string;
  };
  
  export type User = {
    id: string;
    name: string;
    avatarUrl: string;
  };
  
  export type Project = {
    id: string;
    name: string;
    agentIds: string[];
    teamMemberIds: string[];
    folderId?: string;
  };
  
  export type Folder = {
    id: string;
    name: string;
  }

  export type Notification = {
    id: number;
    text: string;
    time: string;
    read: boolean;
  }
  