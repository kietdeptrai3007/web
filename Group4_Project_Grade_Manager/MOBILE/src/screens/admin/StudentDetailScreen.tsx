import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // <-- Import Picker
import { getScoresByStudentId, addScore, deleteScore, getSubjects, getSemesters } from '../../api';
import { Score } from '../../types';
import Ionicons from '@expo/vector-icons/Ionicons';
import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';

// Định nghĩa kiểu cho Subject và Semester để dùng với TypeScript
interface Subject {
    subject_id: number;
    subject_name: string;
}
interface Semester {
    semester_id: number;
    semester_name: string;
}

const StudentDetailScreen = ({ route, navigation }: any) => {
    const { studentId, studentName } = route.params;
    
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    
    // State để lưu danh sách môn học và học kỳ
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [semesters, setSemesters] = useState<Semester[]>([]);

    // State cho việc thêm điểm
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [scoreValue, setScoreValue] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({ title: studentName });
    }, [navigation, studentName]);

    // Hàm fetch tất cả dữ liệu cần thiết cho màn hình
    const fetchData = async () => {
        setLoading(true);
        try {
            const [scoresRes, subjectsRes, semestersRes] = await Promise.all([
                getScoresByStudentId(studentId),
                getSubjects(),
                getSemesters()
            ]);
            setScores(scoresRes.data);
            setSubjects(subjectsRes.data);
            setSemesters(semestersRes.data);
            // Gán giá trị mặc định cho picker
            if (subjectsRes.data.length > 0) setSelectedSubject(subjectsRes.data[0].subject_id);
            if (semestersRes.data.length > 0) setSelectedSemester(semestersRes.data[0].semester_id);
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
            Alert.alert("Lỗi", "Không thể tải dữ liệu cho trang.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [studentId]);

    const handleSaveScore = async () => {
        if (!selectedSubject || !selectedSemester || !scoreValue) {
            Alert.alert("Thông tin trống", "Vui lòng chọn đủ thông tin và nhập điểm.");
            return;
        }
        try {
            const newScoreData = {
                student_id: studentId,
                subject_id: selectedSubject,
                semester_id: selectedSemester,
                score: parseFloat(scoreValue),
            };
            await addScore(newScoreData);
            setModalVisible(false);
            fetchData(); // Tải lại cả điểm, môn học, học kỳ
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm điểm.");
        }
    };
    
    const handleDeleteScore = (id: number) => {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa điểm này?", [
            { text: "Hủy" },
            { text: "Xóa", style: "destructive", onPress: async () => {
                try {
                    await deleteScore(id);
                    setScores(prev => prev.filter(s => s.score_id !== id));
                } catch (error) {
                     Alert.alert("Lỗi", "Không thể xóa điểm.");
                }
            }}
        ]);
    };
    
    const renderScoreItem = ({ item }: { item: Score }) => (
        <View style={styles.scoreRow}>
            <Text style={[styles.cell, styles.subjectCell]}>{item.subject_name}</Text>
            <Text style={[styles.cell, styles.semesterCell]}>{item.semester_name}</Text>
            <Text style={[styles.cell, styles.scoreCell]}>{item.score.toFixed(1)}</Text>
            <TouchableOpacity onPress={() => handleDeleteScore(item.score_id)} style={styles.iconButton}>
                 <Ionicons name="trash-outline" size={22} color="#A90000" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* ... (Phần FlatList giữ nguyên) ... */}
            <FlatList
                data={scores}
                keyExtractor={(item) => item.score_id.toString()}
                renderItem={renderScoreItem}
                ListHeaderComponent={
                    <View style={styles.headerRow}>
                        <Text style={[styles.headerText, styles.subjectCell]}>Môn học</Text>
                        <Text style={[styles.headerText, styles.semesterCell]}>Học kỳ</Text>
                        <Text style={[styles.headerText, styles.scoreCell]}>Điểm</Text>
                        <View style={styles.iconButton} />
                    </View>
                }
                ListEmptyComponent={<Text style={styles.emptyText}>Chưa có dữ liệu điểm.</Text>}
            />
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Thêm Điểm Mới</Text>
                        
                        <Text style={styles.pickerLabel}>Chọn môn học</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={selectedSubject} onValueChange={(itemValue) => setSelectedSubject(itemValue)}>
                                {subjects.map((s) => <Picker.Item key={s.subject_id} label={s.subject_name} value={s.subject_id} />)}
                            </Picker>
                        </View>
                        
                        <Text style={styles.pickerLabel}>Chọn học kỳ</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={selectedSemester} onValueChange={(itemValue) => setSelectedSemester(itemValue)}>
                                {semesters.map((s) => <Picker.Item key={s.semester_id} label={s.semester_name} value={s.semester_id} />)}
                            </Picker>
                        </View>

                        <StyledTextInput placeholder="Điểm (vd: 8.5)" value={scoreValue} onChangeText={setScoreValue} keyboardType="numeric" />
                        
                        <StyledButton title="Lưu Điểm" onPress={handleSaveScore} />
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setModalVisible(false)}>
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    // ... (các styles khác giữ nguyên)
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#fff' },
    headerRow: {
        flexDirection: 'row', backgroundColor: '#f2f2f2', paddingHorizontal: 10, paddingVertical: 15,
        borderBottomWidth: 1, borderColor: '#ddd', alignItems: 'center',
    },
    headerText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    scoreRow: {
        flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15,
        borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center',
    },
    cell: { fontSize: 16 },
    subjectCell: { flex: 2, textAlign: 'left' },
    semesterCell: { flex: 1.5, textAlign: 'center' },
    scoreCell: { flex: 1, textAlign: 'center', fontWeight: 'bold' },
    iconButton: { width: 40, alignItems: 'center' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
    fab: {
        position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center',
        right: 30, bottom: 30, backgroundColor: '#A90000', borderRadius: 30, elevation: 8,
    },
    modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25,
        alignItems: 'stretch', width: '90%', elevation: 5,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    pickerLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    pickerContainer: {
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
    },
});


export default StudentDetailScreen;