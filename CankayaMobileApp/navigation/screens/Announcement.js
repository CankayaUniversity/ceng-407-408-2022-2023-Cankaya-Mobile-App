import React from "react";
import {WebView} from "react-native-webview";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Announcement(navigation) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <WebView
                source={{
                    uri: "https://www.cankaya.edu.tr/duyuru/",
                }}
                /* style={{ flex: 1, marginTop: 10 }} */
            />
        </SafeAreaView>
    );
}
