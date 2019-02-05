export default (password) => {

    //password 处理，反向 => charCodeAt => 函数处理 => 拼接字符串
    return [...password].map(member => {
        let charCode = String(member).charCodeAt(0);
        //函数处理
        charCode = Math.pow(charCode, 3);
        return charCode;
    }).reverse().join('');
}
