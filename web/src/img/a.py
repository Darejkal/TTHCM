import os
import glob
p=os.walk(".")
dir_path = os.path.dirname(os.path.realpath(__file__))
for (a,b,c) in p:
    for bb in b:
        path="./"+bb
        wlk=os.walk(path)
        cmd=[]
        for (dirpath, dirnames, filenames) in wlk:
            print(filenames)
            for (i,s) in enumerate(filenames):
                if(s[-3::]=="png"):
                    break
                if(s[-3::]=="gif"):
                    cmd.append("convert \""+s+"\"[0] "+str(i)+".png")
                else:
                    cmd.append("convert \""+s+"\" "+str(i)+".png")
                cmd.append("del /f \""+s+"\"")
        os.chdir(path)
        for x in cmd:
            os.system(x)
        os.chdir(dir_path)
