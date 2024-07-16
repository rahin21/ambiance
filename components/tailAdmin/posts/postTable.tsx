import Image from "next/image";
import React from "react";
import Link from "next/link";
import { postType } from "@/types/types";

function PostTable({ post }: { post: postType[] }) {
  return (
    <div className="rounded-sm border border-stroke shadow-default overflow-x-auto  bg-black/20 p-5 mt-5">
      <h1 className="text-2xl font-semibold text-black capitalize mb-3">
          {post[0].key} Posts
        </h1>
      <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-black/20">
          <tr>
            <th scope="col" className="px-6 py-3">
              Key
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Thumbnail
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Gallery
            </th>
            <th scope="col" className="px-6 py-3">
              Update
            </th>
          </tr>
        </thead>
        <tbody>
          {post.map((item) => (
            <tr key={item.id} className="bg-white border-b border-black/20">
              <td className="px-6 py-4">{item.key}</td>
              <td className="px-6 py-4">{item.title}</td>
              <td scope="row" className="px-6 py-4 w-40 font-medium text-gray-900">
                <div className="aspect-square w-40 inline-block overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    width={200}
                    height={200}
                    alt={`post image`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 w-[18rem]"
              >
                <div className="flex flex-wrap justify-center gap-1 ">
                  {item.gallery.map((img, index) =>
                    index < 4 ? (
                      <div key={img} className="aspect-square w-20 ">
                        <Image
                          src={img}
                          width={100}
                          height={100}
                          alt={`post image`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                    ) : (
                      <span key={img}></span>
                    )
                  )}
                </div>
              </td>
              <td className="px-6 py-4 w-36">
                <Link
                  href={`/admin/posts/${item.id}`}
                  className="inline-flex items-center justify-center bg-black px-4 py-1 text-center font-medium text-white hover:bg-opacity-90  "
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostTable;
