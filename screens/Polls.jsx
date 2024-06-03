import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../components/Button";
import ListItem from "../components/ListItem";
import axios from "axios";

export default function Polls() {
  const [electionType, setElectionType] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const electionTypes = [
    "Lok Sabha Election",
    "Rajya Sabha Election",
    "Vidhan Sabha Election",
    "Zila Panchayat Election",
    "Municipality Election",
  ];

  const electionData = {
    "Lok Sabha Election": [
      {
        title: "Candidate 1",
        image: require("../assets/img/person1.png"),
        description: "Party A",
      },
      {
        title: "Candidate 2",
        image: require("../assets/img/person2.jpg"),
        description: "Party B",
      },
    ],
    "Rajya Sabha Election": [
      {
        title: "Candidate 1",
        image: require("../assets/img/person1.png"),
        description: "Party A",
      },
      {
        title: "Candidate 2",
        image: require("../assets/img/person2.jpg"),
        description: "Party B",
      },
    ],
    "Vidhan Sabha Election": [
      {
        title: "Candidate 1",
        image: require("../assets/img/person1.png"),
        description: "Party A",
      },
      {
        title: "Candidate 2",
        image: require("../assets/img/person2.jpg"),
        description: "Party B",
      },
    ],
    "Zila Panchayat Election": [
      {
        title: "Candidate 1",
        image: require("../assets/img/person1.png"),
        description: "Party A",
      },
      {
        title: "Candidate 2",
        image: require("../assets/img/person2.jpg"),
        description: "Party B",
      },
    ],
    "Municipality Election": [
      {
        title: "Candidate 1",
        image: require("../assets/img/person1.png"),
        description: "Party A",
      },
      {
        title: "Candidate 2",
        image: require("../assets/img/person2.jpg"),
        description: "Party B",
      },
    ],
  };

  const handleElectionTypeChange = (type) => {
    setElectionType(type);
    setCandidates(electionData[type] || []);
    setSelectedCandidate(null);
    setModalVisible(false);
  };

  const handleCandidateSelection = (candidate) => {
    console.log("Selected Candidate:", candidate);
    setSelectedCandidate(candidate);
  };

  const handleCastVote = async () => {
    if (!electionType) {
      alert("Please Select an Election Type.");
      return;
    }

    if (!selectedCandidate) {
      alert("Please Select a Candidate to Cast Your Vote.");
      return;
    }

    const userId = await AsyncStorage.getItem("user_id");
    if (!userId) {
      console.log("User ID Not Found");
      return;
    }

    const voteInfo = {
      electionType,
      candidate: selectedCandidate.title,
      party: selectedCandidate.description,
      userId: userId,
    };

    console.log("Casting vote for:", voteInfo);

    axios
      .post("http://localhost:5000/votes", voteInfo)
      .then((response) => {
        console.log("Vote Casted Successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleCandidateSelection(item)}>
      <View>
        <ListItem items={item} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdown}
      >
        <Text>{electionType || "Select Election Type"}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {electionTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalItem}
              onPress={() => handleElectionTypeChange(type)}
            >
              <Text style={styles.textStyle}>
                {index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;{type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <FlatList data={candidates} renderItem={renderItem} />
      <View style={styles.buttonContainer}>
        <Button title={"Cast Vote"} onPress={handleCastVote} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 60,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  modalView: {
    marginTop: 60,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    margin: 5,
  },
  textStyle: {
    color: "black",
  },
});
