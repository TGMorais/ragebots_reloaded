# import urllib

# url = 'https://services.sapo.pt/Codebits/botmake/01,02,03,04,05,06,07,08,I%20Rule!'
# u = urllib.urlopen(url)
#u is a file-like object
# data = u.info()
# print data

import os, sys
import Image

size = 60, 60

folder = 'img/'
parts = ['body','eyes','mouth','legs','head','arms']
nparts = 25;

for i in range(len(parts)):
    #print i, a[i]
    foldername = folder + parts[i] + '/'
    print foldername
    for x in range(nparts):
        infile = foldername + str(x) + '_big.png'
        outname = foldername + str(x) + '.png'
        print infile, outname
        try:
            im = Image.open(infile)
            box =(80,60,320,340)
            region = im.crop(box)
            region.thumbnail(size, Image.ANTIALIAS)
            #im.thumbnail(size, Image.ANTIALIAS)
            region.save(outname, "PNG")
            #im.save(outfile, "PNG")
        except IOError:
            print "cannot create file for '%s'" % infile



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