import { AntDesign } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../../config/firebaseConfig';

export default function Perfil({ navigation }) {

    const [userInfo, setUserInfo] = useState({ apelido: '', email: '' });
    const [modalVisible, setModalVisible] = useState(false); // Controle do modal
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'Users', user.uid));
                    if (userDoc.exists()) {
                        setUserInfo(userDoc.data());
                    }
                } catch (error) {
                    console.error('Erro ao buscar informações do usuário:', error);
                }
            }
        };

        fetchUserInfo();
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('OnBoarding'); // Redireciona para a tela de login após o logout
        } catch (error) {
            console.error('Erro ao sair:', error);
            Alert.alert('Erro', 'Não foi possível desconectar. Tente novamente mais tarde.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Perfil</Text>
                </View>
                <View style={styles.profile}>
                    <AntDesign name="user" size={50} color="#000" />
                    <Text style={styles.profileName}>{userInfo.apelido || 'Usuário'}</Text>
                    <Text style={styles.headerTextEmail}>{userInfo.email || 'email@example.com'}</Text>
                </View>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('MinhaConta')} // Adicione navegação
                >
                    <AntDesign name="user" size={30} color="#000" />
                    <Text style={styles.menuItemText}>Minha Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setModalVisible(true)} // Mostra o modal ao clicar
                >
                    <AntDesign name="filetext1" size={30} color="#000" />
                    <Text style={styles.menuItemText}>Termo de Uso</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleLogout}
                >
                    <AntDesign name="logout" size={30} color="#000" />
                    <Text style={styles.menuItemText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Modal simples dos Termos de Uso */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Fecha o modal
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Termos de Uso</Text>
                        <Text style={styles.modalText}>
                            Ao utilizar o app TotalTech, você concorda com os termos de uso e condições estabelecidas.
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#FF7F27',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileName: {
        fontSize: 18,
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemText: {
        fontSize: 16,
        marginLeft: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#FF7F27',
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
