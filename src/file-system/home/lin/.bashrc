set +h
umask 022
LIN=/mnt/lin
LC_ALL=C
LIN_TGT=$(uname -m)-lin-linux-gnu
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi
PATH=$LIN/tools/bin:$PATH

export CXXFLAGS="-s" 
export CFLAGS="-s" 
export MAKEFLAGS="-jN" 
export LIN LC_ALL LIN_TGT PATH CONFIG_SITEexport MAKEFLAGS="-j4" export LIN_TGT32=i686-lfs-linux-gnu
