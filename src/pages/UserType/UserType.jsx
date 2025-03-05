// import CardSubsciptions from "@/components/CardSubsciptions/CardSubsciptions";
import "./UserType.css";
import { useState } from "react";
import CardSubsciptions from "../../components/CardSubsciptions/CardSubsciptions";
export default function SubscriptionChoise() {

  return (
    <main className="subscription-choise">
      <div className="container">
        <div className="Title-button">
          <h2>Veuillez choisir votre type de Compte</h2>
        </div>
        <div className="row">
          <CardSubsciptions />
        </div>
        
      </div> 
    </main>
  );
}
