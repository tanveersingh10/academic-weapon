import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { onAuthStateChanged, getAuth, reload} from "firebase/auth";

const VerificationScreen = ({ navigation }) => {
    const auth = getAuth();
    const [reloadToggle, setReloadToggle] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                reload(user).then(() => {
                    if (user.emailVerified) {
                        navigation.navigate('Home');
                    }
                });
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text>Waiting for email verification...</Text>
            </View>
            <View>
            <TouchableOpacity onPress={() => setReloadToggle(!reloadToggle)}>
                    <Text>Reload</Text>
            </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
};

export default VerificationScreen;