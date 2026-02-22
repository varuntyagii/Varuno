import Lottie from "lottie-react"
import React, { useState, useRef } from "react"
import AI from "../assets/Ai_Brain"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import click from '../assets/click.mp3'

const Ai = () => {

  const [text, setText] = useState("")
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const openSound = new Audio(click)
  const [active, setActive] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.log("Speech not supported")
    return null
  }

  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = "en-US"
  }

  const recognition = recognitionRef.current

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  recognition.onresult = (e) => {

    const transcript = e.results[0][0].transcript
      .toLowerCase()
      .trim()

    setText(transcript)

    const isClose =
      transcript.includes("close") ||
      transcript.includes("back")

    // HOME
    if (transcript.includes("home")) {
      if (isClose) {
        speak("Going back")
        navigate(-1)
      } else {
        speak("Opening home page")
        navigate("/")
      }
    }

    // ABOUT
    else if (transcript.includes("about")) {
      if (isClose) {
        speak("Going back")
        navigate(-1)
      } else {
        speak("Opening about page")
        navigate("/about")
      }
    }

    // CART
    else if (transcript.includes("cart")) {
      if (isClose) {
        speak("Going back")
        navigate(-1)
      } else {
        speak("Opening cart")
        navigate("/cart")
      }
    }

    // ORDERS
    else if (transcript.includes("order")) {
      if (isClose) {
        speak("Going back")
        navigate(-1)
      } else {
        speak("Opening orders page")
        navigate("/order")
      }
    }

    // CONTACT
    else if (transcript.includes("contact")) {
      if (isClose) {
        speak("Going back")
        navigate(-1)
      } else {
        speak("Opening contact page")
        navigate("/contact")
      }
    }

    // COLLECTION
    else if (
      transcript.includes("collection") ||
      transcript.includes("products") ||
      transcript.includes("product")
    ) {
      if (isClose) {
        speak("Going back")
        navigate(-1)
      } else {
        speak("Opening collection page")
        navigate("/collection")
      }
    }

    else {
      speak("Command not recognized")
      toast.error("Try Again");
    }
  }
  recognition.onend=()=>{
    setActive(false);
  }

  return (
    <div
      className="fixed bottom-[60px] left-[2%] z-10"
      onClick={() => {recognition.start(); openSound.play()
        setActive(true);
      }}
    >
      <div className="absolute inset-0 bg-gray-600/50 rounded-full blur-lg " />

      <Lottie
        animationData={AI}
        loop
className={`relative h-[80px] w-[80px] cursor-pointer transition-all duration-200 ${
  active ? "scale-110" : "scale-100"
}`}
      />
    </div>
  )
}

export default Ai
