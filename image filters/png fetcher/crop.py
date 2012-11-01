# import urllib

# url = 'https://services.sapo.pt/Codebits/botmake/01,02,03,04,05,06,07,08,I%20Rule!'
# u = urllib.urlopen(url)
#u is a file-like object
# data = u.info()
# print data

import os, sys
import Image

resW = 30
resH = 30

folder = 'img/'
parts = ['body','eyes','mouth','legs','head','arms']
nparts = 25;

for i in range(len(parts)):
    #print i, a[i]
    foldername = folder + parts[i] + '/'
    print foldername
    master = Image.new(mode='RGBA',size=((resW+2)*25,resH*2),color=(0,0,0,0));
    outname2 = foldername + 'master.png'
    for x in range(nparts):
        infile = foldername + str(x+1) + '_big.png'
        outname = foldername + str(x+1) + '.png'
        print infile, outname
        try:
            im = Image.open(infile)
            box =(80,60,320,340)
            region = im.crop(box)
            #region.thumbnail((resW,resH), Image.ANTIALIAS)
            region = region.resize((resW,resH), Image.ANTIALIAS )
            region2 = region.transpose(Image.FLIP_LEFT_RIGHT)
            master.paste(region,((resW+2)*(x),0))
            master.paste(region2,((resW+2)*(x),resH))
            region.save(outname, "PNG")
        except IOError:
            print "cannot create file for '%s'" % infile
    master.save(outname2,"PNG")



    # for infile in sys.argv[1:]:
    # outfile = os.path.splitext(infile)[0] + "_resized2.png"
    # if infile != outfile:
        # try:
            # im = Image.open(infile)
            # box =(80,60,320,340)
            # region = im.crop(box)
            # region.thumbnail(size, Image.ANTIALIAS)
            #im.thumbnail(size, Image.ANTIALIAS)
            # region.save(outfile, "PNG")
            #im.save(outfile, "PNG")
        # except IOError:
            # print "cannot create thumbnail for '%s'" % infile