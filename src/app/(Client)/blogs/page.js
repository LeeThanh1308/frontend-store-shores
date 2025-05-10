"use client";

import {
  blogsSelector,
  handleChangeRefreshBlog,
  handleGetListBlogs,
} from "@/services/redux/Slices/blogs";
import { handleToggleLike, likesSelector } from "@/services/redux/Slices/likes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaHeart } from "react-icons/fa";
import FallbackImage from "@/components/ui/FallbackImage";
import Link from "next/link";
import { Pagination } from "antd";
import Responsive from "@/components/layout/Responsive";
import { authSelector } from "@/services/redux/Slices/auth";
import { generateUrlImage } from "@/services/utils";
import { useRequireLogin } from "@/hooks/useRequireLogin";

function BlogsPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const requireLogin = useRequireLogin();
  const { listBlogs, onRefresh } = useSelector(blogsSelector);
  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    dispatch(handleGetListBlogs({ isLogin: isAuthenticated, page }));
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        handleGetListBlogs({ isLogin: isAuthenticated, page })
      ).unwrap();
      dispatch(handleChangeRefreshBlog(false));
    };

    fetchData();
  }, [page, onRefresh]);
  return (
    <div className="py-4">
      <Responsive>
        <div className="flex flex-col gap-2">
          {listBlogs?.data?.map((_, i) => {
            return (
              <Link href={`/blogs/${_?.slug}-${_?.id}`} key={i}>
                <div className="p-3 shadow-sm shadow-black flex justify-between items-center rounded-lg font-dancing-script">
                  <div className=" flex-[0.8] flex items-center gap-2">
                    <div className="w-16 h-16 rounded-full relative shrink-0 overflow-hidden">
                      <FallbackImage
                        src={_?.avatar ? generateUrlImage(_?.avatar) : ""}
                        layout="fill"
                        alt="logo"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold font-roboto">{_?.fullname}</h1>
                      <h1 className=" font-bold text-xl line-clamp-3">
                        {_?.title}
                      </h1>
                    </div>
                  </div>

                  <div
                    className=" text-sm flex flex-col justify-center items-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      requireLogin(async () => {
                        await dispatch(
                          handleToggleLike({ blogID: _?.id })
                        ).unwrap();
                        dispatch(handleChangeRefreshBlog(true));
                      });
                    }}
                  >
                    <FaHeart
                      className={`hover:cursor-pointer hover:opacity-85 ${
                        _?.isLike ? "text-red-500" : "text-white text-shadow"
                      }`}
                      size={20}
                    />
                    <span>{_?.countLike}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <Pagination
            align="center"
            defaultCurrent={1}
            onChange={(page) => setPage(page)}
            pageSize={listBlogs?.limit}
            total={+listBlogs?.totalPage * +listBlogs?.limit}
          />
        </div>
      </Responsive>
    </div>
  );
}

export default BlogsPage;
