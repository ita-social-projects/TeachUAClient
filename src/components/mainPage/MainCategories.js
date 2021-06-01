import "./css/AboutDescription.css";
import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../service/CategoryService";
import PrimitiveCard from "../PrimitiveCard";
import "./css/AboutCategories.css";
import CategoryLogo from "../CategoryLogo";
import { Button, Pagination } from "antd";
import "./css/AboutCarousel.css";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";

const MainCategories = () => {
    const [categories, setCategories] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const [pageSize, setPageSize] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [cardContainerWidth, setCardContainerWidth] = useState(0);

    const getWidth = () =>
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const [width, setWidth] = useState(getWidth());
    function useCurrentWidth() {
        useEffect(() => {
            let timeoutId = null;
            const resizeListener = () => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setWidth(getWidth());
                }, 150);
            };
            window.addEventListener("resize", resizeListener);

            return () => {
                window.removeEventListener("resize", resizeListener);
            };
        }, []);

        return width;
    }
    useCurrentWidth();

    useEffect(() => {
        setPageSize(4);
        getAllCategories().then((response) => {
            setCategories(response);
            setTotalElements(response.length);
        });
    }, []);
    useEffect(() => {
        setTotalPages(Math.ceil(totalElements / pageSize));
    }, [totalElements, pageSize]);
    useEffect(() => {
        if (currentPage * pageSize <= categories.length) {
            let startIndex = currentPage * pageSize;
            let active = categories.slice(startIndex, startIndex + pageSize);
            setActiveCategories(active);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }, [categories, pageSize, currentPage]);
    useEffect(() => {
        if (cardWidth) {
            let itemsToDisplay = Math.floor(cardContainerWidth / cardWidth);
            // let maxItemsInRow = 4;
            // itemsToDisplay =
            //     itemsToDisplay > maxItemsInRow ? maxItemsInRow : itemsToDisplay;
            setPageSize(itemsToDisplay);
        }
    }, [cardWidth, cardContainerWidth, width]);

    const ref = React.createRef();
    useEffect(() => {
        if (ref && ref.current) {
            const { offsetWidth } = ref.current;
            setCardWidth(offsetWidth);
            setCardContainerWidth(ref.current.parentNode.offsetWidth);
        }
    }, [ref]);

    const onPageChangePrev = (page) => {
        if (page === 0) {
            setCurrentPage(totalPages - 1);
        } else {
            setCurrentPage(page - 1);
        }
    };
    const onPageChangeNext = (page) => {
        if (page === totalPages - 1) {
            setCurrentPage(0);
        } else {
            setCurrentPage(page + 1);
        }
    };
    const onChange = (current) => {
        setCurrentPage(current - 1);
    };

    return (
        <div className="about-categories">
            <div className="categories-header">
                <h2 className="label">Оберіть напрям гуртків</h2>
                <a href="/clubs">
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
                    {activeCategories.map((category) => (
                        <PrimitiveCard
                            ref={ref}
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
                //responsive="true"
                hideOnSinglePage
                size="small"
                showSizeChanger={false}
                current={currentPage + 1}
                pageSize={pageSize}
                total={totalElements}
                onChange={onChange}
            />
        </div>
    );
};

export default MainCategories;
