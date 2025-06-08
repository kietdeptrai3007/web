import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, Modal, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStudents, addStudent, deleteStudent } from '../../api';
import { Student } from '../../types';
import Ionicons from '@expo/vector-icons/Ionicons';
import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';

const StudentListScreen = ({ navigation }: any) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentYear, setNewStudentYear] = useState('');

    // SỬA LỖI TẠI ĐÂY
    useFocusEffect(
      React.useCallback(() => {
        // Định nghĩa một hàm async bên trong
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await getStudents();
            setStudents(response.data);
          } catch (error) {
            console.error("Lỗi tải danh sách sinh viên:", error);
            Alert.alert("Lỗi", "Không thể tải danh sách sinh viên.");
          } finally {
            setLoading(false);
          }
        };

        // Gọi hàm async đó
        fetchData();
      }, []) // Dependency array rỗng để chạy mỗi khi màn hình được focus
    );

    const handleAddStudent = async () => {
        if (!newStudentName || !newStudentYear) {
            Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin.");
            return;
        }
        try {
            await addStudent({ student_name: newStudentName, birth_year: parseInt(newStudentYear) });
            setModalVisible(false);
            setNewStudentName('');
            setNewStudentYear('');
            // Gọi lại fetchData sau khi thêm thành công
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm sinh viên.");
        }
    };
    
    const handleDeleteStudent = (id: number) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa sinh viên này?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa", style: "destructive", onPress: async () => {
                    try {
                        await deleteStudent(id);
                        // Cập nhật lại state sau khi xóa thành công
                        setStudents(prevStudents => prevStudents.filter(s => s.student_id !== id));
                    } catch (error) {
                        Alert.alert("Lỗi", "Không thể xóa sinh viên.");
                    }
                }}
            ]
        );
    };

    const renderStudentItem = ({ item }: { item: Student }) => (
        <TouchableOpacity 
            style={styles.studentItem}
            onPress={() => navigation.navigate('StudentDetail', { 
                studentId: item.student_id, 
                studentName: item.student_name 
            })}
        >
            <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{item.student_name}</Text>
                <Text style={styles.studentYear}>Năm sinh: {item.birth_year}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteStudent(item.student_id)}>
                 <Ionicons name="trash-bin" size={24} color="#A90000" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator style={styles.centered} size="large" color="#A90000" />
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.student_id.toString()}
                    renderItem={renderStudentItem}
                    ListHeaderComponent={<Text style={styles.title}>Quản lý Sinh viên</Text>}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}
             <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Thêm sinh viên mới</Text>
                        <StyledTextInput placeholder="Tên sinh viên" value={newStudentName} onChangeText={setNewStudentName} />
                        <StyledTextInput placeholder="Năm sinh" value={newStudentYear} onChangeText={setNewStudentYear} keyboardType="numeric" />
                        <StyledButton title="Lưu" onPress={handleAddStudent} />
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setModalVisible(false)}>
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// Giữ nguyên styles như cũ
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#f4f4f8' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginVertical: 20 },
    studentItem: {
        backgroundColor: '#fff', padding: 20, marginVertical: 8, marginHorizontal: 16,
        borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', elevation: 2,
    },
    studentInfo: { flex: 1 },
    studentName: { fontSize: 18, fontWeight: '600' },
    studentYear: { fontSize: 14, color: 'gray', marginTop: 4 },
    fab: {
        position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center',
        right: 30, bottom: 30, backgroundColor: '#A90000', borderRadius: 30, elevation: 8,
    },
    modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35,
        alignItems: 'center', width: '85%', elevation: 5,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
});

export default StudentListScreen;