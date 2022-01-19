import re
import json
import time
txt=open("./assets/in.txt","r",encoding='utf-8').read()
outer=open("./assets/out.tsx","w",encoding='utf-8')
backup=open("./assets/backup.txt","w",encoding='utf-8')
#identify question with the answers
rp1=r"Câu( )*(?P<id>\d*)( )*(:|\.)( )*(?P<question>([^\n]*)((?:(?!(\n|dann| )*(a|A|e|E|\d)(dann| )*(\.|,|\)|:)))\n?([^\n]*))*)(?P<value>(\n(?:(?!( )*Câu( )*(\d)*( )*(:|\.)( )*)).*)*)"
#cut the answers
rp2=r"(?<=((\n| )[a-zA-Z\d])(\.|\)| ))((?!( )+([a-zA-Z\d])(\.|\))).)*"
#preprocessing marked answers
rp3=r"(?P<vor>.*)( ?)dann( ?)(?P<hinter>.*)"

r=re.compile(rp1, re.UNICODE)
r2=re.compile(rp2, re.UNICODE)
r3=re.compile(rp3, re.UNICODE)
txt=r3.sub(r'\g<1>\g<4>dann',txt)
open("./assets/temp.txt","w",encoding='utf-8').write(txt)
class Answer(object):
    def __init__(self,val,correct=False):
        self.val=val
        self.correct=correct
data=[]
for i in r.finditer(txt):
    x=i.groupdict()     
    l=[]
    for (i,val) in enumerate(r2.finditer(x["value"])):
        ans=val.group().replace("\t","").replace("\n","").strip()
        if not re.sub(r"\s","",ans):
            continue
        if ans.find("dann") == -1:
            l.append({"val":ans,"correct":0,"chosen":0,"id":i})
        else:
            l.append({"val":ans.replace("dann",""),"correct":1,"chosen":0,"id":i})
    data.append({"id":int(x["id"]),"q":re.sub(r"\n\s+","",x["question"]),"a":l})
    backup.write(str(data[-1])+"\n")
outer.write("export let data = {pollID: "+str(time.time())+",poll: "+str(data)+"}")
outer.close()


