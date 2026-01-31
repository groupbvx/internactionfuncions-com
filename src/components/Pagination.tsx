// @ts-nocheck
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

/**
 * Pagination - Componente de paginação
 * 
 * @component
 * @example
 * <Pagination currentPage={1} totalPages={10} onPageChange={setPage} />
 */
export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | '...')[] => {
        const pages: (number | '...')[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // Sempre mostra primeira página
        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        // Páginas ao redor da atual
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Sempre mostra última página
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav
            className={cn('flex items-center justify-center gap-1', className)}
            aria-label="Paginação"
        >
            {/* Previous */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    'p-2 rounded-md transition-colors',
                    currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                )}
                aria-label="Página anterior"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            'min-w-[40px] px-3 py-2 rounded-md text-sm font-medium transition-colors',
                            currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        )}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                )
            ))}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    'p-2 rounded-md transition-colors',
                    currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                )}
                aria-label="Próxima página"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </nav>
    );
}
