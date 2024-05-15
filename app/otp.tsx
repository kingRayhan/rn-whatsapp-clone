import {
  View,
  Text,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";

const OtpPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("123");
  const { bottom: insetsBottom } = useSafeAreaInsets();
  const keyboardOffset = Platform.OS === "ios" ? 20 : 0;

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const sendOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={{ fontSize: 20, paddingTop: 10 }}>Sending...</Text>
          </View>
        ) : null}

        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Germany</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.listItem}>
            <MaskInput
              style={styles.input}
              keyboardType="numeric"
              autoFocus
              placeholder="(123) 456-7890"
              value={phoneNumber}
              onChangeText={(masked, unmasked) => {
                setPhoneNumber(masked); // you can use the unmasked value as well
              }}
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </View>
        </View>

        <Text style={styles.legal}>
          You must be{" "}
          <Text
            style={styles.link}
            onPress={() => openLink("https://www.whatsapp.com/legal/terms/")}
          >
            at least 16 years old
          </Text>{" "}
          to register. Learn how WhatsApp works with the{" "}
          <Text
            style={styles.link}
            onPress={() => openLink("https://www.meta.com")}
          >
            Meta Companies
          </Text>
          .
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            { marginBottom: insetsBottom },
            styles.button,
            phoneNumber !== "" && styles.enabled,
          ]}
          onPress={() => sendOtp()}
          disabled={loading || !phoneNumber}
        >
          <Text
            style={[styles.buttonText, phoneNumber !== "" && styles.enabled]}
          >
            {loading ? "Loading..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    lineHeight: 20,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: "500",
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 8,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    marginTop: 10,
    marginBottom: -6,
  },

  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OtpPage;
