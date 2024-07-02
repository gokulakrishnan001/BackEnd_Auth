import jwt from "jsonwebtoken"

const privatekey=`
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFwP1IMP1UxNrlv4GlWUxIc3y2jRtpRhaDwXrLySyMjPTPrdDW8j
HnGjrAJsBHWZbHtO+4N7a2vzNR2EZQyhlJwU6jJTnqfejZeCfMEPaP6ylj7Nnghw
829yIKeaHX76ubAVDmOZsclh8jR/vF0hRxEY4Gt1DXoCQxtVLNKB/9FFAgMBAAEC
gYAZxLSPGtdxTC0JwSBd5A4+avecl1arobgzWc0X214oFx5M+aLRANt8o3t6EhIN
eKxMt4be/qTKyoCLioteRbv6viFlpaQxI6yoswPhKjBnxZreDSs2SrRx3KIQ7D1I
Jt9v1ea+ZbDYzDkpg46f/8AQ/MOUXOcOhionNnEVdUsg4QJBAKO1vrSKjpR6YLmd
ZX29gmu6XWYmCenmNZgMa3pAAJawGzaItMFMlDzJax2OTgt9LpAfF0/PmnOe8lYV
JX1VsQMCQQCP9f1nV6kWv93PD4eVcaBdmPRiF5jZS5JCTMLKe4VBNc+FAODMy36l
2498ahLnV/9h83DxZB6QMd+GvGh9yk4XAkEAlnAtDztESq0qtWcuHJ5JezWHHpdW
BNrH5TGEkpK997tdRn/ZmsgEcNem10It9eDTKR1pDq54AEfP6csE6GgWgQJAcXVa
4M6quf4/T0ibAAIMdJfuyzxzv5Ya0Fv1DWYqUImbYuSdR2p+BzOys0haW6/z23vk
oKral6Rm2aa156XAwwJAeo45izDk/V2hW3sBeWHfJb9Mk5khDwTh+T+TuXAPsD/W
+MWcN6aaBQQ029aP+/9bsSXA2OLH8EiN8S3nPH3tKw==
-----END RSA PRIVATE KEY-----
`


const publickey=`
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFwP1IMP1UxNrlv4GlWUxIc3y2jR
tpRhaDwXrLySyMjPTPrdDW8jHnGjrAJsBHWZbHtO+4N7a2vzNR2EZQyhlJwU6jJT
nqfejZeCfMEPaP6ylj7Nnghw829yIKeaHX76ubAVDmOZsclh8jR/vF0hRxEY4Gt1
DXoCQxtVLNKB/9FFAgMBAAE=
-----END PUBLIC KEY-----
`

export function signInJWT(payload,expiresIn){
    return jwt.sign(payload,privatekey,{algorithm:"RS256",expiresIn})
}

export function verifyJWT(token){
    try{
        const decoded=jwt.verify(token,publickey)
        return {payload:decoded,expired:false}
    }catch(err){
        return {payload:null,expired:err.message.include("token expired")}
    }
}