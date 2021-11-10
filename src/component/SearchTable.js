import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLimit,
  fetchBooks,
  selectData,
  selectPage,
  fetchTotalPage,
  selectTotalPage,
} from "../redux/user/Dataslice";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";
const SearchTable = () => {
  const dispatch = useDispatch();

  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
  const data = useSelector(selectData);
  const totalPage = useSelector(selectTotalPage);

  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [Year, setYear] = useState("");
  const [categories, setCategories] = useState("");
  const [date, setDate] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(
      fetchBooks({
        page,
        limit,
        Title,
        Author,
        Publisher,
        Year,
        categories,
        date,
      })
    );
    dispatch(
      fetchTotalPage({
        limit,
        Title,
        Author,
        Publisher,
        Year,
        categories,
        date,
      })
    );
  }, [dispatch, page, limit, Title, Author, Publisher, Year, categories, date]);

  return (
    <>
      <SearchForm
        setTitle={setTitle}
        setAuthor={setAuthor}
        setPublisher={setPublisher}
        setYear={setYear}
        setCategories={setCategories}
        setDate={setDate}
        limit={limit}
        setSubmit={setSubmit}
      />
      <div className="flex flex-col w-11/12 mx-auto">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      computer no
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      author
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      year
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      publisher
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      categories
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      second categories
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => {
                    return (
                      <tr key={item.acc}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.acc}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.title}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.author}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.year}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.publisher}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(item.date).getDate() +
                              "/" +
                              (new Date(item.date).getMonth() + 1) +
                              "/" +
                              new Date(item.date).getFullYear()}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.categories}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.scategories}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.bstatus}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        Title={Title}
        Author={Author}
        Publisher={Publisher}
        Year={Year}
        categories={categories}
        date={date}
        limit={limit}
        page={page}
        totalPage={totalPage}
        setSubmit={setSubmit}
        submit={submit}
      />
    </>
  );
};

export default SearchTable;
