import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../../../../config/firebaseConfig';

export default function MinhaConta({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [image, setImage] = useState(null);  // Definindo o estado da imagem

    const auth = getAuth();
    const user = auth.currentUser;
    const usersCollection = collection(db, "Users");
    const userId = user.uid;
    const userDocRef = doc(usersCollection, userId);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setNome(userData.apelido || '');
                    setEmail(userData.email || '');
                    setSenha(userData.senha || '');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSaveNome = async () => {
        try {
            await updateDoc(userDocRef, {
                apelido: nome  // Aqui usamos o estado 'nome'
            });
            Alert.alert('Nome atualizado com sucesso');
        } catch (error) {
            console.error(error);
        }
    };


    const handleSaveEmail = async () => {
        try {
            await updateEmail(auth.currentUser, email);
            console.log('Email Updated Successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveSenha = async () => {
        try {
            await updatePassword(auth.currentUser, senha);
            await updateDoc(userDocRef, {
                senha: senha
            });
            Alert.alert('Password Updated Successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveAll = async () => {
        try {
            await handleSaveNome();
            await handleSaveEmail();
            await handleSaveSenha();
            Alert.alert('All updates were successful');
        } catch (error) {
            console.error('Error updating information:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FE8330" barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Alterar Conta</Text>
            </View>

            <View style={styles.profileImageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <AntDesign name="camerao" size={50} color="gray" />
                    </View>
                )}
                <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
                    <Text style={styles.changePhotoButtonText}>Alterar Foto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder={nome ? nome : "Alterar Nome"}
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder={email ? email : "exemplo@gmail.com"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    value={senha}
                    onChangeText={setSenha}
                />

                <TouchableOpacity style={styles.confirmButton} onPress={handleSaveAll}>
                    <Text style={styles.confirmButtonText}>Confirmar Alterações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FE8330',
        padding: 15,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoButton: {
        marginTop: 10,
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
    changePhotoButtonText: {
        color: 'gray',
    },
    form: {
        marginTop: 10,
        padding: 20
    },
    label: {
        marginVertical: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: '#FE8330',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
