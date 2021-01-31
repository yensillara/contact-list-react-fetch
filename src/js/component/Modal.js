import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Modal = props => {
	const [state, setState] = useState({
		//initialize state here
	});
	const { store, actions } = useContext(Context);
	//aquí agregamos la función contexto, destructurando useContex que contiene store y action
	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Oh no!
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={async () => {
								let success = await actions.deleteContact(props.idToDelete);
								if (success) {
									props.onClose();
								} else {
									alert("PROBLEMA BORRANDO EL CONTACTO");
								}
							}}>
							Do it!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	idToDelete: PropTypes.number //aquí definimos el PropTypes de isToDelete como un número porque el id es un entero
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
