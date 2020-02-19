function getn(token) 
{
    const decoded = jwt.verify(req.body.token, jwt1);
    return decoded.id;
}
export default getn();
