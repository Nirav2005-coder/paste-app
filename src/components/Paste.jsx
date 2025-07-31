import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllPastes } from "../redux/pasteSlice";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeAllPastes(pasteId));
  }

  // function handleCopy(pasteId) {
  //   const paste = pastes.find(p => p._id === pasteId);
  //   if (paste) {
  //     navigator.clipboard.writeText(paste.content);
  //     alert("Copied!");
  //   }
  // }

  function handleShare(pasteId) {
  const paste = pastes.find(p => p._id === pasteId);
  if (paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
      });
    } else {
      alert("Sharing not supported. Copying content instead.");
      navigator.clipboard.writeText(paste.content);
    }
  }
}


  return (
   <div className="border border-gray-200 rounded-lg shadow p-4 bg-yellow-500">

      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br /><br ></br>

     <div className="rounded-2xl mt-4 min-w-[700px] p-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border">
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button><a href={`/?pasteId=${paste?._id}`}> Edit</a>
                   </button>
                  <button> <a href={`/pastes/${paste?._id}`}>View</a>
                    </button> 
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      alert("copied");
                    }}
                  >
                    Copy
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => handleShare(paste?._id)}>Share</button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
