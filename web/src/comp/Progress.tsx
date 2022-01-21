
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
let url="https://dmlggswkb6.execute-api.ap-southeast-1.amazonaws.com/simplebeta/simple/"
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
    // return true
    let healthyNewspaper:ExportType={
        method: "add",
        obj: {
            userID:Date.now().toString()+eID,
            poll:dt,
            t:time,
            p:percentage,
        },
    }
    return fetch(url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': 'https://objective-mestorf-575f14.netlify.app'
            },
            body: JSON.stringify(healthyNewspaper)
        }).then(
           async (response)=>{
            if (!response.ok) { throw "UnknowError"}
            let preanswer = await response.json()
            let answer;
            if (typeof preanswer.body === "string")
                answer = await JSON.parse(preanswer.body);
            else {
                answer = await preanswer.body;
            }
            switch (answer?.internalStatus) {
                case CODE.SUCCESS:
                    return true;
                case undefined:
                   throw(CODE.OVERLOAD)
                default:
                    throw answer.internalStatus;
            }
}
    ).catch((e) => {
            console.log("ERROR: "+e)
            return false;
        });
}


