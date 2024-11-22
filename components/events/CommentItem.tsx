import { Comment } from "@/types/comments";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Divider, Modal, Portal, Text, TextInput } from "react-native-paper";

interface CommentItemProps {
    comment: Comment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
    const [openedModal, setOpenedModal] = useState(false);

    return <View style={styles.container}>
        <View style={styles.comment}>
            {comment.commentedBy.image ? <Avatar.Image
                size={50}
                source={{
                    uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
                }}
            /> : <Avatar.Text size={50} label={`${comment.commentedBy.firstName[0]}${comment.commentedBy.lastName[0]}`} style={styles.avatar} />}
            <View style={styles.content}>
                <Text style={styles.contentText} variant="bodyMedium">{comment.content}</Text>
                <TouchableOpacity style={styles.replyButton} onPress={() => setOpenedModal(true)}>
                    <Text style={styles.replyButtonText} variant="bodyMedium">Responder</Text>
                </TouchableOpacity>
            </View>
        </View>
        {comment.replies.map(reply =>
            <View key={reply.id} style={styles.reply}>
                {reply.repliedBy.image ? <Avatar.Image
                    size={40}
                    source={{
                        uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
                    }}
                /> : <Avatar.Text size={40} label={`${reply.repliedBy.firstName[0]}${reply.repliedBy.lastName[0]}`} style={styles.avatar} />}
                <View style={styles.content}>
                    <Text style={styles.contentText} variant="bodyMedium">{reply.content}</Text>
                </View>
            </View>
        )}
        <Divider style={styles.divider} />

        <Portal>
            <Modal visible={openedModal} onDismiss={() => setOpenedModal(false)} contentContainerStyle={styles.modal}>
                <View style={styles.replyForm}>
                    <Text variant="titleMedium">Responde al comentario</Text>
                    <TextInput
                        label={<Text>Respuesta</Text>}
                        outlineColor="#B0B0B0"
                        multiline
                        activeOutlineColor="black"
                        textColor="black"
                        mode="outlined"
                        outlineStyle={{ borderRadius: 8 }}
                    />

                    <TouchableOpacity
                        style={styles.buttonForm}
                        onPress={() => setOpenedModal(false)}>
                        <Text variant="bodyLarge" style={styles.buttonFormText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Portal>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
    },
    comment: {
        flexDirection: "row",
        padding: 5,
        gap: 10,
    },
    divider: {
        marginVertical: 10,
    },
    reply: {
        flexDirection: "row",
        padding: 5,
        gap: 10,
        marginLeft: 30,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    content: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },
    contentText: {
        color: "#000000",
    },
    replyButton: {
        alignSelf: "flex-end",
    },
    replyButtonText: {
        color: "#B0B0B0",
        textDecorationLine: "underline",
    },
    avatar: {
        backgroundColor: "#5F19F2",
        opacity: 0.7,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
    },
    replyForm: {
        flexDirection: "column",
        gap: 10,
        padding: 10,
    },
    buttonForm: {
        backgroundColor: "#5F19F2",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonFormText: {
        color: "white",
    },
});