package com.pdmnotes;

import java.util.List;

public class PdmCrypt {


    private static final String LIB_NAME = "c20";

    static {
        // load the native library
        System.loadLibrary(LIB_NAME);
    }

    public static void callbackStatic(String string) {
        System.out.println("Static callback: " + string);
    }

    // Native method declaration
    public native String getHash(String a);
    public native String help(String a);
    public native String loaderCheck(String a, String b);
    public native String loaderOut(String a, String b);

    public void callback(String string) {
        System.out.println("Callback: " + string);
    }

    public String callbackObject(List<String> arrayList) {
        System.out.println("Callback object with size: "
                + arrayList.size()
                + " and payload: "
                + arrayList.get(0));
        return arrayList.get(0);
    }
    public void getHashTest(){
        String a = new String("hello");
        help(a);
    }
//    public static void main(String[] args) {
//        PdmCrypt jni = new PdmCrypt();
//        System.out.println(jni.getHash());
//    }
}
