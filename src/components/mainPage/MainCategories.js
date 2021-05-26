import "./css/AboutDescription.css";
import React, { useState, useEffect } from "react";
import { getPageableCategory } from "../../service/CategoryService";
import PrimitiveCard from "../PrimitiveCard";
import "./css/AboutCategories.css";
import CategoryLogo from "../CategoryLogo";
import { Button, Pagination } from "antd";
import "./css/AboutCarousel.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
//import { useHistory } from "react-router";

const MainCategories = () => {
    const [categories, setCategories] = useState({
        content: [],
    });
    const [pageSize, setPageSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getData = (page) => {
        getPageableCategory(page).then((response) => {
            setCategories(response);
            setPageSize(pageSize === 0 ? response.size : pageSize);
            setTotalPages(response.totalPages);
        });
    };

    useEffect(() => {
        getData(currentPage);
    }, []);

    const onChange = (current) => {
        setCurrentPage(current - 1);
        getData(current - 1);
    };

    const onPageChangePrev = (page) => {
        onChange(page);
        if (page === 0) {
            setCurrentPage(totalPages - 1);
            getData(totalPages - 1);
        } else {
            setCurrentPage(page - 1);
            getData(page - 1);
        }
    };

    const onPageChangeNext = (page) => {
        onChange(page);
        if (page === totalPages - 1) {
            setCurrentPage(0);
            getData(0);
        } else {
            setCurrentPage(page + 1);
            getData(page + 1);
        }
    };

    const getWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    function useCurrentWidth() {
        // save current window width in the state object
        let [width, setWidth] = useState(getWidth());

        // in this case useEffect will execute only once because
        // it does not have any dependencies.
        useEffect(() => {
            // timeoutId for debounce mechanism
            let timeoutId = null;
            const resizeListener = () => {
                // prevent execution of previous setTimeout
                clearTimeout(timeoutId);
                // change width from the state object after 150 milliseconds
                timeoutId = setTimeout(() => {
                    setWidth(getWidth());
                    let itemsCount = Math.floor((getWidth() - 192) / 296);
                    console.log(itemsCount);
                    setPageSize(itemsCount);
                }, 150);
            };
            // set resize listener
            window.addEventListener("resize", resizeListener);

            // clean up function
            return () => {
                // remove resize listener
                window.removeEventListener("resize", resizeListener);
            };
        }, []);

        return width;
    }

    useCurrentWidth();
    return (
        <div className="about-categories">
            <div className="categories-header">
                <h2 className="label">Оберіть напрям гуртків</h2>
                <a href="/dev/clubs">
                    <Button className="flooded-button more-button">
                        Всі гуртки
                    </Button>{" "}
                </a>
            </div>
            <div className="categories-carousel-block">
                <ArrowLeftOutlined
                    className="arrows-prev"
                    onClick={() => onPageChangePrev(currentPage)}
                />
                <ArrowRightOutlined
                    className="arrows-next"
                    onClick={() => onPageChangeNext(currentPage)}
                />
                <div className="categories-cards">
                    {categories.content.map((category) => (
                        <PrimitiveCard
                            key={category.id}
                            header={
                                <div className="title">
                                    <CategoryLogo category={category} />
                                    <div className="name">{category.name}</div>
                                </div>
                            }
                            description={category.description}
                            link={{
                                pathname: "/clubs",
                                state: {
                                    showAdvancedSearch: true,
                                    showActiveCategory: category.name,
                                },
                            }}
                            buttonText="Переглянути"
                        />
                    ))}
                </div>
            </div>
            <Pagination
                className="pagination"
                responsive="true"
                hideOnSinglePage
                size="small"
                showSizeChanger={false}
                current={currentPage + 1}
                pageSize={pageSize}
                total={totalPages}
                onChange={onChange}
            />
        </div>
    );
};

export default MainCategories;
