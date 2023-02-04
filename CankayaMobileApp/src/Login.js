import { View, Text, Image } from "react-native";
import React from "react";
import { cankayaBlue, cankayaYellow } from "./Constants";
import Field from "./Field";
import Btn from "./Btn";
import Hyperlink from "react-native-hyperlink";
import Logo from "./Logo";
import Back from "../components/Back";

const Login = () => {
  return (
    <View style={{ alignItems: "center", width: 460 }}>
      <Back />
      <View
        style={{
          backgroundColor: "yellow",
          height: 900,
          width: 460,
          borderTopLeftRadius: 220,
          paddingTop: 70,
          alignItems: "center",
        }}
      >
        <Logo />
        <Text
          style={{
            color: "grey",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        ></Text>
        <Field placeholder="Kullanıcı adı" />
        <Field placeholder="Parola" secureTextEntry={true} />
        <View
          style={{ alignItems: "flex-end", width: "78%", marginBottom: 200 }}
        >
          <Text
            style={{
              color: "grey",
              fontWeight: "bold",
              fontSize: 16,
              allignItems: "flex-end",
            }}
          >
            Şifreni mi unuttun ?
          </Text>
        </View>
        <Btn
          textColor="white"
          bgColor={cankayaBlue}
          btnLabel="Oturum Aç"
          Press={() => alert("Logged In")}
        />
        <View>
          <Text>Çankaya Üniversitesi Öğrenci Webmail Servisi • </Text>
          <Hyperlink
            linkStyle={{
              color: cankayaBlue,
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
            }}
            linkText={(url) =>
              url === "http://bim.cankaya.edu.tr/" ? "Destek İsteyin" : url
            }
          >
            <Text style={{ fontSize: 15 }}>http://bim.cankaya.edu.tr/</Text>
          </Hyperlink>
        </View>
      </View>
    </View>
  );
};

export default Login;
