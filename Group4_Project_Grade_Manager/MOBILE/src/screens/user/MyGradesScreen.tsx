import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getScoresByStudentId } from '../../api';
import { Score } from '../../types';

const MyGradesScreen = () => {
    const { user } = useAuth();
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Chỉ fetch điểm khi có thông tin user
        if (user && user.user_id) {
            const fetchScores = async () => {
                setLoading(true);
                try {
                    // Giả định user_id tương ứng với student_id
                    const response = await getScoresByStudentId(user.user_id);
                    setScores(response.data);
                } catch (error) {
                    console.error("Lỗi tải điểm của tôi:", error);
                    Alert.alert("Lỗi", "Không thể tải được bảng điểm.");
                } finally {
                    setLoading(false);
                }
            };
            fetchScores();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <ActivityIndicator style={styles.centered} size="large" color="#A90000" />;
    }

    if (!user) {
        return <View style={styles.centered}><Text>Vui lòng đăng nhập lại.</Text></View>;
    }

    const renderScoreItem = ({ item }: { item: Score }) => (
        <View style={styles.scoreRow}>
            <Text style={[styles.cell, styles.subjectCell]}>{item.subject_name}</Text>
            <Text style={[styles.cell, styles.semesterCell]}>{item.semester_name}</Text>
            <Text style={[styles.cell, styles.scoreCell]}>{item.score.toFixed(1)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={[styles.headerText, styles.subjectCell]}>Môn học</Text>
                <Text style={[styles.headerText, styles.semesterCell]}>Học kỳ</Text>
                <Text style={[styles.headerText, styles.scoreCell]}>Điểm</Text>
            </View>
            <FlatList
                data={scores}
                keyExtractor={(item) => item.score_id.toString()}
                renderItem={renderScoreItem}
                ListEmptyComponent={<Text style={styles.emptyText}>Bạn chưa có dữ liệu điểm.</Text>}
            />
        </SafeAreaView>
    );
};

// Các styles này tương tự như StudentDetailScreen
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#fff' },
    headerRow: {
        flexDirection: 'row', backgroundColor: '#f2f2f2', paddingHorizontal: 15, paddingVertical: 15,
        borderBottomWidth: 1, borderColor: '#ddd', alignItems: 'center',
    },
    headerText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    scoreRow: {
        flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15,
        borderBottomWidth: 1, borderColor: '#eee',
    },
    cell: { fontSize: 16 },
    subjectCell: { flex: 2, textAlign: 'left' },
    semesterCell: { flex: 1.5, textAlign: 'center' },
    scoreCell: { flex: 1, textAlign: 'center', fontWeight: 'bold' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});

export default MyGradesScreen;