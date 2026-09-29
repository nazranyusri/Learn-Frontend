import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useHealth, useLogin } from "@/hooks";
import { useAuthStore } from "@/stores";
import { useState } from "react";

export default function HomeScreen() {
  const { isAuthenticated, hasHydrated, logout } = useAuthStore();

  // States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Hooks
  const { isHealthPending, isHealthError, healthData } = useHealth(
    isAuthenticated && hasHydrated,
  );
  const { login, isLoginPending, isLoginError, loginError } = useLogin();

  // Function
  const handleLogin = () => {
      login({ email, password });
  };

  const handleRegister = () => {
    // Implement register logic here
  };

  return (
    <View style={styles.container}>
      {!hasHydrated ? (
        <Text style={styles.subtitle}>Loading...</Text>
      ) : isAuthenticated ? (
        <>
          <Text style={styles.title}>Learn-Frontend</Text>
          <Text style={styles.subtitle}>
            {isHealthPending
              ? "Checking backend..."
              : isHealthError
                ? "Backend unavailable"
                : `Backend: ${healthData?.status ?? "Unknown"}`}
          </Text>
          <Button title="Log out" onPress={logout} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter your email..."
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Enter your password..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title={isLoginPending ? "Logging in..." : "Login"}
            disabled={isLoginPending}
            onPress={() => {
              handleLogin();
            }}
          />
          {isLoginError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>{loginError?.title}</Text>
              <Text style={styles.error}>{loginError?.message}</Text>
            </View>
          ) : null}
          <Button
            title="Didn't have an account? Register"
            onPress={() => {
              handleRegister();
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    color: "#667085",
    fontSize: 16,
  },
  error: {
    color: "#b42318",
  },
  errorContainer: {
    marginTop: 8,
  },
  errorTitle: {
    color: "#b42318",
    fontWeight: "700",
  },
});
