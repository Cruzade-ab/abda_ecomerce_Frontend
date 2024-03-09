"use client"
import Navbar from "./components/home/navBar/Navbar";
import SearchBar from "./components/home/searchBar/SearchBar";

export default function Home() {
  return (
    <>
    <main className="">
      <Navbar/>
      <SearchBar></SearchBar>
    </main>
    </>
  );
}