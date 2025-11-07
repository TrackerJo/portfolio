import { useEffect, useRef, useState } from "react";
import "./github_stats.css";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface RecentCommit {
    message: string;
    repo: string;
    date: string;
    sha: string;
}

const GitHubStatsWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [recentCommit, setRecentCommit] = useState<RecentCommit | null>(null);
    const windowRef = useRef<HTMLDivElement>(null);

    // Fetch contribution data from GitHub API
    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/TrackerJo?y=last');
                const data = await response.json();

                const days: ContributionDay[] = [];

                // Parse the contributions from the API response
                if (data.contributions) {
                    data.contributions.forEach((contribution: { date: string; count: number; level: number }) => {
                        // The API returns dates in UTC format (YYYY-MM-DD)
                        // We'll keep them as-is since GitHub uses UTC dates
                        days.push({
                            date: contribution.date,
                            count: contribution.count,
                            level: contribution.level
                        });
                    });
                }

                setContributions(days);
            } catch (error) {
                console.error('Error fetching GitHub contributions:', error);
                // Fallback to empty data if API fails
                setContributions([]);
            }
        };

        fetchContributions();
    }, []);

    // Fetch most recent commit
    useEffect(() => {
        const fetchRecentCommit = async () => {
            try {
                // First, get all repositories
                const reposResponse = await fetch('https://api.github.com/users/TrackerJo/repos?sort=pushed&per_page=10');
                const repos = await reposResponse.json();

                // Find the most recently pushed repository
                let latestCommit = null;
                let latestDate = new Date(0);

                for (const repo of repos) {
                    try {
                        // Get the latest commit for this repo
                        const commitsResponse = await fetch(
                            `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
                            {
                                headers: {
                                    'Accept': 'application/vnd.github+json',
                                    'X-GitHub-Api-Version': '2022-11-28'
                                }
                            }
                        );

                        if (commitsResponse.ok) {
                            const commits = await commitsResponse.json();
                            if (commits.length > 0) {
                                const commit = commits[0];
                                const commitDate = new Date(commit.commit.author.date);

                                if (commitDate > latestDate) {
                                    latestDate = commitDate;
                                    latestCommit = {
                                        message: commit.commit.message.split('\n')[0], // First line only
                                        repo: repo.full_name,
                                        date: commitDate.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: '2-digit'
                                        }),
                                        sha: commit.sha.substring(0, 7)
                                    };
                                }
                            }
                        }
                    } catch (error) {
                        // Skip repos that fail to fetch
                        continue;
                    }
                }

                if (latestCommit) {
                    setRecentCommit(latestCommit);
                }
            } catch (error) {
                console.error('Error fetching recent commit:', error);
            }
        };

        fetchRecentCommit();
    }, []);

    // Intersection observer to detect when component is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (windowRef.current) {
            observer.observe(windowRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getColor = (level: number) => {
        const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
        return colors[level];
    };

    const getMonths = () => {
        const months: { name: string; offset: number }[] = [];
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - (52 * 7));

        let currentMonth = startDate.getMonth();

        for (let i = 0; i < contributions.length; i += 7) {
            const weekDate = new Date(contributions[i].date);
            const month = weekDate.getMonth();

            if (month !== currentMonth || i === 0) {
                months.push({
                    name: weekDate.toLocaleDateString('en-US', { month: 'short' }),
                    offset: Math.floor(i / 7)
                });
                currentMonth = month;
            }
        }

        return months;
    };

    const formatDate = (dateString: string) => {
        // Parse the date string as UTC to avoid timezone issues
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
        setHoveredDay(day);
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const graphContainer = target.closest('.contribution-graph');

        if (graphContainer) {
            const containerRect = graphContainer.getBoundingClientRect();
            const relativeX = rect.left - containerRect.left + rect.width / 2;
            const relativeY = rect.top - containerRect.top;
            setTooltipPosition({ x: relativeX, y: relativeY });
        }
    };

    const handleMouseLeave = () => {
        setHoveredDay(null);
    };

    // Group contributions by week, ensuring each week has exactly 7 days
    const weeks: (ContributionDay | null)[][] = [];

    // Find what day of the week the first contribution is
    // Parse as UTC to avoid timezone offset issues
    const firstDate = contributions.length > 0
        ? (() => {
            const [year, month, day] = contributions[0].date.split('-').map(Number);
            return new Date(year, month - 1, day);
        })()
        : new Date();
    const firstDayOfWeek = firstDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Add empty cells before the first contribution
    const firstWeek: (ContributionDay | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
        firstWeek.push(null);
    }

    // Add contributions
    let currentWeek = firstWeek;
    for (let i = 0; i < contributions.length; i++) {
        currentWeek.push(contributions[i]);

        // If we've filled a week (7 days), start a new week
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    // Add empty cells to complete the last week
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        weeks.push(currentWeek);
    }

    return (
        <div className="terminal-window" onClick={handleTerminalButtonClick} ref={windowRef}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
                <div className="terminal-title">github_stats.sh</div>
            </div>
            <div className="terminal-content">
                <div className="output">
                    <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">./github_stats.sh --user TrackerJo</span>
                </div>
                <div className="section-title">:: GitHub Statistics</div>

                <div className="github-stats-container">

                    {/* Recent Commit Card */}
                    <div
                        className={`stats-card recent-commit-card ${isVisible ? 'fade-in' : ''}`}
                        style={{ animationDelay: '0.1s' }}
                        onClick={(e) => {
                            if (recentCommit) {
                                e.stopPropagation();
                                window.open(`https://github.com/${recentCommit.repo}`, '_blank');
                            }
                        }}
                    >
                        <div className="recent-commit-content">
                            <div className="commit-header">
                                <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                                    <path fillRule="evenodd" d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5h-3.32zM8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                                </svg>
                                <h3>Currently Working On</h3>
                            </div>
                            {recentCommit ? (
                                <>
                                    <div className="commit-message">{recentCommit.message}</div>
                                    <div className="commit-details">
                                        <span className="commit-repo">{recentCommit.repo}</span>
                                        <span className="commit-separator">•</span>
                                        <span className="commit-sha">{recentCommit.sha}</span>
                                    </div>
                                    <div className="commit-date">{recentCommit.date}</div>
                                </>
                            ) : (
                                <div className="commit-loading">Loading latest commit...</div>
                            )}
                        </div>
                    </div>

                    {/* Top Languages Card */}
                    <div className="stats-card">
                        <img
                            src="https://github-readme-stats.vercel.app/api/top-langs/?username=TrackerJo&layout=compact&theme=github_dark&hide_border=true&bg_color=161b22&title_color=58a6ff&text_color=c9d1d9"
                            alt="Top Languages"
                            className={`github-stat-image ${isVisible ? 'fade-in' : ''}`}
                            style={{ animationDelay: '0.3s' }}
                        />
                    </div>

                    {/* Contribution Graph */}
                    <div className="stats-card full-width contribution-graph-card">
                        <div className={`contribution-graph ${isVisible ? 'fade-in' : ''}`} style={{ animationDelay: '0.5s', position: 'relative' }}>
                            {/* Month labels */}
                            <div className="months-container">
                                {getMonths().map((month, i) => (
                                    <div
                                        key={i}
                                        className="month-label"
                                        style={{ gridColumn: `${month.offset + 1} / span 4` }}
                                    >
                                        {month.name}
                                    </div>
                                ))}
                            </div>

                            {/* Days labels and grid */}
                            <div className="contribution-grid-container">
                                {/* Day labels */}
                                <div className="days-labels">
                                    <div className="day-label"></div>
                                    <div className="day-label">Mon</div>
                                    <div className="day-label"></div>
                                    <div className="day-label">Wed</div>
                                    <div className="day-label"></div>
                                    <div className="day-label">Fri</div>
                                    <div className="day-label"></div>
                                </div>

                                {/* Contribution grid */}
                                <div className="contribution-grid">
                                    {weeks.map((week, weekIndex) => (
                                        <div key={weekIndex} className="week-column">
                                            {week.map((day, dayIndex) => (
                                                <div
                                                    key={dayIndex}
                                                    className={`contribution-day ${day ? '' : 'empty'}`}
                                                    style={{ backgroundColor: day ? getColor(day.level) : 'transparent' }}
                                                    onMouseEnter={day ? (e) => handleMouseEnter(day, e) : undefined}
                                                    onMouseLeave={day ? handleMouseLeave : undefined}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tooltip */}
                            {hoveredDay && (
                                <div
                                    className="contribution-tooltip"
                                    style={{
                                        left: `${tooltipPosition.x}px`,
                                        top: `${tooltipPosition.y}px`,
                                    }}
                                >
                                    <strong>{hoveredDay.count} contributions</strong>
                                    <div>{formatDate(hoveredDay.date)}</div>
                                </div>
                            )}

                            {/* Legend */}
                            <div className="contribution-legend">
                                <span>Less</span>
                                <div className="legend-box" style={{ backgroundColor: '#161b22' }}></div>
                                <div className="legend-box" style={{ backgroundColor: '#0e4429' }}></div>
                                <div className="legend-box" style={{ backgroundColor: '#006d32' }}></div>
                                <div className="legend-box" style={{ backgroundColor: '#26a641' }}></div>
                                <div className="legend-box" style={{ backgroundColor: '#39d353' }}></div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default GitHubStatsWindow;
