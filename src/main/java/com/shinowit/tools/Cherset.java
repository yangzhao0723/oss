package com.shinowit.tools;

import java.io.UnsupportedEncodingException;

/**
 * Created by Administrator on 2014/11/13.
 */
public class Cherset {

    public  String charSet(String str) {
        try {
            if(str==null){
                return null;
            }else{
                str =str.replaceAll(" ","");
                byte[] bb = str.getBytes("ISO-8859-1");
                str = new String(bb, "UTF-8");
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return str;
    }
}
