package com.shinowit.dao;

/**
 * Created by Administrator on 2014-11-19.
 */

//
//import java.text.SimpleDateFormat;
//        import java.util.Date;
//
//public class Test extends Thread{
//
//    private static long orderNum = 0l;
//    private static String date ;
//
//    public static void main(String[] args) throws InterruptedException {
//        for (int i = 0; i < 10000; i++) {
//            System.out.println(Test.getOrderNo());
//            Thread.sleep(1000);
//        }
//    }
//
//    /**
//     * 生成订单编号
//     * @return
//     */
//    public static synchronized String getOrderNo() {
//        String str = new SimpleDateFormat("yyMMddHHmm").format(new Date());
//        if(date==null||!date.equals(str)){
//            date = str;
//            orderNum  = 0l;
//        }
//        orderNum ++;
//        long orderNo = Long.parseLong((date)) * 10000;
//        orderNo += orderNum;
//        return orderNo+"";
//
//    }
//
//}
import java.text.SimpleDateFormat;
import java.util.Date;
//
//public class Test {
//    public static final String PREFIX = "DD";
//    private static long code;
//
//    public static void main(String[] args) {
//        System.out.println(Test.nextCode());
//        System.out.println(Test.nextCode());
//        System.out.println(Test.nextCode());
//    }
//
//    public static synchronized String nextCode() {
//        code++;
//        String str = new SimpleDateFormat("yyyyMM").format(new Date());
//        long m = Long.parseLong((str)) * 10000;
//        m += code;
//        return PREFIX + m;
//    }
//
//}



