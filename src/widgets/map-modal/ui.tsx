import React from "react";
import { Modal, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BLACK_COLOR, Spacer, WHITE_COLOR } from "../../shared/config";
import CrossIcon from "../../shared/assets/icons/crossIcon.svg";

interface IMapModalProps {
	isVisible: boolean;
	handleCloseModal: () => void;
}

export const MapModal: React.FC<IMapModalProps> = (props) => {
	const { isVisible, handleCloseModal } = props;
	const insets = useSafeAreaInsets();

	return (
		<Modal
			animationType="slide"
			visible={isVisible}
			onRequestClose={handleCloseModal}
		>
			<MapView
				style={styles.map}
				loadingEnabled
				region={{
					latitude: 53.93281,
					longitude: 27.51086,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Marker
					coordinate={{
						latitude: 53.93281,
						longitude: 27.51086,
					}}
				/>
			</MapView>
			<BackButtonContainer
				topInset={insets.top}
				onPress={handleCloseModal}
			>
				<BackButton>
					<CrossIcon
						width={Spacer.LARGE}
						height={Spacer.LARGE}
						color={BLACK_COLOR}
					/>
				</BackButton>
			</BackButtonContainer>
		</Modal>
	);
};

const BackButtonContainer = styled.TouchableOpacity<{ topInset: number }>`
	position: absolute;
	left: ${Spacer.MEDIUM}px;
	top: ${({ topInset }) => topInset + Spacer.MEDIUM}px;
	width: 34px;
	height: 34px;
	border-radius: 17px;
	background: ${WHITE_COLOR};
	justify-content: center;
	align-items: center;
	shadowcolor: ${BLACK_COLOR};
	shadowopacity: 0.1;
	shadowradius: 1px;
`;

const BackButton = styled.View`
	z-index: 5;
`;

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
