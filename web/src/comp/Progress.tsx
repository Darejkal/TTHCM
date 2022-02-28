
export type PQuestionAnswer={
    val: string;
    correct: number;
    chosen:number;
    id:number;
}
export type PQuestion={
    id:number;
    q:string;
    a:PQuestionAnswer[]
}
export type PData={
    pollID:number;
    poll:PQuestion[]
}
// export type PDataExport={
//     pollID:string;
//     //ID is replaced in favor of array
//     poll:{
//         id:number;
//         a:{
//             correct: number;
//             chosen:number;
//             id:number;
//         }[]
//     }[];
// }


export type originalPoll={
    pollID: number;
    poll: {
        id: number;
        q: string;
        a: {
            val: string;
            correct: number;
            chosen: number;
            id: number;
        }[];
    }[];
}
export type PDataExport={
    pollID:string;
    poll:
        {
        id:number;
        a:{
            id:number;
        //correct?
            c1: number;
        //chosen?
            c2:number;
        }[]
    }[];
}
export type ExportType ={
    method:string;
    obj:{
        //userID
        userID:string;
        poll:PDataExport
        //percentage
        p:number;
        t:number
    }
}
let CODE={
    SUCCESS:"00001",
    FAILED:"00002",
    NULL:"00003",
    INVALID:"00010",
    OVERLOAD:"00020"
}
// const uID=Date.now().toString()+"E"+Math.floor(Math.random()*100).toString()
const eID="E"+Math.floor(Math.random()*100000).toString()
export async function _updateProgress(dt:PDataExport,percentage:number,time:number):Promise<boolean>{
    //Used to use for updating progress
    return true
}


