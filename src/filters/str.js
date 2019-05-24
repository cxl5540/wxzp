export const str = (str) => {
    if (str) {
        let regs = new RegExp("\r", "g");
        let reg = new RegExp("\n", "g");
        let regSpace = new RegExp(" ", "g");
        str = str.replace(reg, "<br/>");
        str = str.replace(regs, "<br/>");
        str = str.replace(regSpace, "&nbsp;");
        return str;
    }
}
